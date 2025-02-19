const { Repository } = require("../database");

// const { getSignedUrlForRead } = require("../config/awsconfig");
class TalentPoolService {
  constructor() {
    this.repository = new Repository();
  }

  async respondRPC(request) {
    console.log("Received request", request);

    if(request.type==="TALENTPOOL_GET_ALL_TALENTPOOL_USERS"){

      const{recruiter_id}=request.data;
      const data=await this.repository.getAllTalentPoolResumes(recruiter_id);

      return data;

    }


    return { data: "Invalid request" };
  }

  async handleEvent(event) {
    console.log("Received event", event);
  }
}

module.exports = { TalentPoolService };