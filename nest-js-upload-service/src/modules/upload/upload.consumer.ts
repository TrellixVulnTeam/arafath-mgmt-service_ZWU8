import {
  InjectQueue,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job, Queue } from 'bull';
import { HttpService } from '@nestjs/common';
import { Student } from './entities/student.entity';
import { map } from 'rxjs/operators';
import { gql, request } from 'graphql-request';
import {} from 'socketcluster-client';
import * as SC from 'socketcluster-client';

const xlsxFile = require('read-excel-file/node');

@Processor('UPLOAD_QUEUE')
export class UploadConsumer {
  constructor(
    @InjectQueue('UPLOAD_QUEUE') private genieQueue: Queue,
    private readonly httpService: HttpService,
  ) {

  }

  async submitToUser(students: Student[]) {
    const query = gql`
      mutation createUser($studentArray: [StudentCreateDTO!]!) {
        createStudent(studentInput: $studentArray) {
          id
        }
      }
    `;

    const variables = {
      studentArray: students,
    };

    try {
      const data = await request(
        'http://localhost:3000/graphql',
        query,
        variables,
      );
      return  data
    } catch (error) {
      console.error(JSON.stringify(error, undefined, 2));
      return error;
    }
  }

  @Process()
  async processUploadJob(job: Job) {
    let student: Student[] = [];

    const fileName = job.data.file.filename;

    try {
      await xlsxFile(`./uploads/${fileName}`).then((rows) => {
        const columnNames = rows.shift(); // Separate first row with column names
        rows.map((row) => {
          // Map the rest of the rows into objects
          const obj: any = {}; // Create object literal for current row
          row.forEach((cell, i) => {
            obj[columnNames[i]] = cell; // Use index from current cell to get column name, add current cell to new object
          });

          const stud: Student = {
            name: obj.Name,
            dob: obj.DOB,
            email: obj.Email,
            age: this.calculateAge(obj.DOB),
          };
          student.push(stud);
        });
      });
    } catch (error) {
      console.log('error', error);
    }

    if (student.length > 0) {
      let success = await this.submitToUser(student);
      return  success
    }
  }

  calculateAge(birthday: Date) {
    var ageDifMs = Date.now() - birthday.getTime();
    var ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  @OnQueueFailed()
  async onRetryQues(job: Job, result: Error) {
    console.log('queFailed', Error);
  }

  @OnQueueCompleted()
  async onSubmitUser(job: Job, result: any) {
    // call done when finished
    let socket = SC.create({
      hostname: 'localhost',
      port: 8000,
    });

    (async () => {
      try {
       
        await socket.invokePublish(
          'fileUploadChannel',
          `Completed job with result ${result}`,
        );
        console.log(result);
      } catch (error) {
        console.log(error, '--error from cluster server');
      }
    })();
    console.log(`Completed job with result ${result}`);
    console.log('processUploadJob' + job.data.file);
  }
}
