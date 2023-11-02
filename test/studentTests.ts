import request from 'supertest'
import { PostStudent } from "../src/interfaces/Student";
import MessageResponse from "../src/interfaces/MessageResponse";
import {Student} from "../src/interfaces/Student";

// TODO: Test the getStudents function. Verify that it fetches and validates the list of students.

const getStudents = (url: string | Function): Promise<Student[]> => {
    return new Promise((resolve, reject) => {
        request(url)
        .get('/api/v1/students')
        .expect(200, (err, response) => {
            if (err) {
                reject(err);
            } else {
                const result: Student[] = response.body;
                expect(result.length).toBeGreaterThanOrEqual(1);
                result.forEach((student) => {
                    expect(result[0].student_name).not.toBe('');
                    expect(result[0].birthdate).not.toBe('');
                    expect(result[0].student_id).not.toBe('');
                });
                resolve(result);
            }
        })
    });
};

// TODO: Test the getSingleStudent function. Verify that it fetches and validates a single student.

// TODO: Test the postStudent function. Verify that it adds a student and validates the response: id and message.

const postStudent = (url: string | Function, student: PostStudent): Promise<MessageResponse> => {
    return new Promise((resolve, reject) => {
        request(url)
        .post('/api/v1/students')
        .set('content-type', 'form-data')
        .attach('image', student.filename)
        .field('student_name', student.student_name)
        .field('birthdate', student.birthdate)
        .expect(200, (err, response) => {
            if (err) {
                reject(err);
            } else {
                const result: MessageResponse = response.body;
                expect(result.id).not.toBe('');
                expect(result.message).toBe('Student created successfully');
                resolve(result);
            }
        })
    });
};

// TODO: Test the putStudent function. Verify that it updates a student and validates the response: id and message.

// TODO: Test the deleteStudent function. Verify that it deletes a student and validates the response: id and message.

export {
    getStudents, 
    // getSingleStudent, 
    postStudent, 
    // putStudent, 
    // deleteStudent
};
