const { Repository } = require("../database");
const { Service } = require("../services");

// const { getSignedUrlForRead } = require("../config/awsconfig");
class TalentPoolService {
  constructor() {
    this.repository = new Repository();
    this.service = new Service();
  }

  async respondRPC(request) {
    console.log("Received request", request);

    if (request.type === "TALENTPOOL_GET_ALL_TALENTPOOL_USERS") {
      console.log("hello from talentpool");

      const { recruiter_id } = request.data;

      console.log(recruiter_id);
      const data = await this.repository.getAllTalentPoolResumes(recruiter_id);

      console.log(data);

      return data;
    }

    return { data: "Invalid request" };
  }

  async handleEvent(event) {

    console.log("EVENT RECIEVED",event);
    if (event.type === "APPLY_JOB") {
      const { resume_id, recruiter_id, name, email } = event.data;

      await this.service.addResume(
        resume_id,
        recruiter_id,
        name,
        email,
        "Unknown",
        "Unknown",
        "Unknown",
        0,
        "Unknown",
        "Unknown",
        "Unknown"
      );
    }
  }
}

module.exports = { TalentPoolService };