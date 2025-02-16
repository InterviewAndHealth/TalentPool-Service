const express = require("express");
const { Service } = require("../services");
const {
  BadRequestError,
  UnauthorizedError,
  InternalServerError,
} = require("../utils/errors");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
const service = new Service();

const resumator = require("resumator");


const AWS = require("aws-sdk");
const fs = require("fs");

const {s3,upload}=require("../config/awsconfig");

const { customAlphabet } = require("nanoid");

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);


const{AWS_ACCESS_KEY_ID,AWS_SECRET_ACCESS_KEY,AWS_REGION,AWS_S3_BUCKET_NAME,SIGNED_URL_EXPIRATION}= require("../config");




router.get("/", (req, res) => {
  res.json({ message: "Welcome to the TalentPool API" });
});



router.post("/uploadresumes", authMiddleware, upload.array("resumes", 5), async (req, res) => {

        const recruiter_id = req.userId;
        
      if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: "No files uploaded" });
      }

      let responses = [];

      for (const file of req.files) {
          const resume_id = nanoid();

          console.log(file);

        const resumeData = await service.extractResumeData(file.buffer);
        if(Object.keys(resumeData).length === 0 && resumeData.constructor === Object){
            responses.push({error:"Resume data not found"});
            continue;
        }

        const candidate_name=resumeData.name;
        const candidate_email=resumeData.email;
        const contact_number=resumeData.contact_number;
        const city=resumeData.city;
        const country=resumeData.country;
        const years_of_experience=resumeData.years_of_experience;
        const expertise=resumeData.expertise;
        const current_company=resumeData.current_company;
        const location_preference=resumeData.location_preference;

        // let parsedResume = null;
        // try{
        //    parsedResume = await resumator.parseResume(file.buffer);
        // }
        // catch(error){
        //   console.log(error);
        // }
        

        // console.log("parsedResume is :"+parsedResume);

        // if (!parsedResume) {
        //     responses.push({ error: "Resume data not found" });
        //     continue;
        // }


        // try{

        //   const candidate_name = parsedResume.name || "Unknown";
        // const candidate_email = parsedResume.email || "Not Found";
        // const contact_number = parsedResume.phone || "Not Found";
        
        // const location = parsedResume.location?.split(",");
        // const city = location?.[0]?.trim() || "Unknown";
        // const country = location?.[1]?.trim() || "Unknown";

        // const years_of_experience = parsedResume.experience?.reduce((total, exp) => {
        //     const match = exp.duration.match(/(\d+)\s*years?/);
        //     return total + (match ? parseInt(match[1]) : 0);
        // }, 0) || 0;

        // const expertise = `${parsedResume.summary || ""} ${parsedResume.skills?.join(", ") || ""}`.trim();
        
        // const current_company = parsedResume.experience?.[0]?.company || "Unknown";
        // const location_preference = parsedResume.location || "Unknown";




        // }catch(error){
        //   console.log(error);
        // }
        // const candidate_name = parsedResume.name || "Unknown";
        // const candidate_email = parsedResume.email || "Not Found";
        // const contact_number = parsedResume.phone || "Not Found";
        
        // const location = parsedResume.location?.split(",");
        // const city = location?.[0]?.trim() || "Unknown";
        // const country = location?.[1]?.trim() || "Unknown";

        // const years_of_experience = parsedResume.experience?.reduce((total, exp) => {
        //     const match = exp.duration.match(/(\d+)\s*years?/);
        //     return total + (match ? parseInt(match[1]) : 0);
        // }, 0) || 0;

        // const expertise = `${parsedResume.summary || ""} ${parsedResume.skills?.join(", ") || ""}`.trim();
        
        // const current_company = parsedResume.experience?.[0]?.company || "Unknown";
        // const location_preference = parsedResume.location || "Unknown";


        console.log("step1");
          // Upload to S3
          const uploadParams = {
              Bucket: AWS_S3_BUCKET_NAME,
              Key: `TalentPool/${resume_id}.pdf`,
              Body: file.buffer,
              ContentType: file.mimetype,
          };

          const s3Result = await s3.upload(uploadParams).promise();
          const fileUrl = s3Result.Location;

          console.log("step2");

          const data=await service.addResume(resume_id,recruiter_id,candidate_name,candidate_email,contact_number,city,country,years_of_experience,expertise,current_company,location_preference);

          console.log("step3");



          responses.push(data);
      }

      res.status(200).json(responses);

});


router.get("/getallresumes", authMiddleware, async (req, res) => {
  const recruiter_id = req.userId;
  const data = await service.getAllResumes(recruiter_id);
  return res.status(200).json(data);
});


router.post("/getresumebyid", authMiddleware, async (req, res) => {
  const {resume_id} = req.body;
  const recruiter_id = req.userId;

  const data = await service.getResumeById(resume_id,recruiter_id);
  return res.status(200).json(data);
});



router.get("/rpc", async (req, res) => {
  const data = await service.rpc_test();

  return res.json(data);
});

module.exports = router;
