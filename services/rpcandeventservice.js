const { Repository } = require("../database");

// const { getSignedUrlForRead } = require("../config/awsconfig");
class TalentPoolService {
  constructor() {
    this.repository = new Repository();
  }

  async respondRPC(request) {
    console.log("Received request", request);

    if(request.type==="TALENTPOOL_GET_ALL_TALENTPOOL_USERS"){

      console.log("hello from talentpool");

      const{recruiter_id}=request.data;

      console.log(recruiter_id);
      const data=await this.repository.getAllTalentPoolResumes(recruiter_id);

      console.log(data);

      return data;

    }


    return { data: "Invalid request" };
  }

  async handleEvent(event) {
    console.log("Received event", event);
  }
}

module.exports = { TalentPoolService };