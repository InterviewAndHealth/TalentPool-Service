const bcrypt = require("bcrypt");
const { Repository } = require("../database");
const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} = require("../utils/errors");
const { EventService, RPCService } = require("./broker");
const {
  SERVICE_QUEUE,
  EVENT_TYPES,
  TEST_QUEUE,
  TEST_RPC,
} = require("../config");

const pdfParse = require("pdf-parse");
const { getSignedUrlForRead } = require("../config/awsconfig");

// Service will contain all the business logic
class Service {
  constructor() {
    this.repository = new Repository();
  }

  // Login method will be used to authenticate the user
 async extractResumeData (buffer) {
    try {
        const data = await pdfParse(buffer);
        const text = data.text;
  
        return {
            name: text.match(/Name:\s*(.*)/)?.[1] || "Unknown",
            email: text.match(/[\w.-]+@[\w.-]+\.\w+/)?.[0] || "Not Found",
            contact_number: text.match(/\b\d{10}\b/)?.[0] || "Not Found",
            city: text.match(/City:\s*(.*)/)?.[1] || "Unknown",
            country: text.match(/Country:\s*(.*)/)?.[1] || "Unknown",
            years_of_experience: parseInt(text.match(/(\d+)\s*years of experience/)?.[1]) || 0,
            expertise: text.match(/Expertise:\s*(.*)/)?.[1] || "Unknown",
            current_company: text.match(/Company:\s*(.*)/)?.[1] || "Unknown",
            location_preference: text.match(/Preferred Location:\s*(.*)/)?.[1] || "Unknown",
        };
    } catch (error) {
        console.error("Error parsing resume:", error);
        return {};
    }
  };









  async addResume(resume_id,recruiter_id,candidate_name,candidate_email,contact_number,city,country,years_of_experience,expertise,current_company,location_preference) {

    const data = await this.repository.addResume(resume_id,recruiter_id,candidate_name,candidate_email,contact_number,city,country,years_of_experience,expertise,current_company,location_preference);

    return{
      message:"Resume added successfully",
      data
    }
    
  };








  async getAllResumes(recruiter_id){

    const data = await this.repository.getAllResumes(recruiter_id);

    return{
      message:"Resumes fetched successfully",
      data
    }

  }


  async getResumeById(resume_id,recruiter_id){

    const data = await this.repository.getResumeById(resume_id,recruiter_id);

    if (!data) throw new NotFoundError("Resume not found");

    const filename = `${resume_id}.pdf`
    const signedUrl = await getSignedUrlForRead(filename)
    // console.log(signedUrl);
    return { data: signedUrl }
  }

  async rpc_test() {
    const data = await RPCService.request(TEST_RPC, {
      type: TEST_RPC,
      data: "Requesting data",
    });

    if (!data) throw new InternalServerError("Failed to get data");

    return data;
  }

  static async handleEvent(data) {
    console.log(data);
  }

  static async respondRPC(data) {
    console.log(data);
    return { data: "This is a response of rpc" };
  }
}

EventService.subscribe(SERVICE_QUEUE, Service);
RPCService.respond(Service);

module.exports = Service;
