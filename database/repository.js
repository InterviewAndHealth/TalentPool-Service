const { customAlphabet } = require("nanoid");
const DB = require("./db");

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 12);

// Repository will be used to interact with the database
class Repository {
  // Get user by email
  async getUser(email) {
    const result = await DB.query({
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    });
    return result.rows[0];
  }

  // Create a new user
  async createUser(email, password, name) {
    const id = nanoid();

    const result = await DB.query({
      text: "INSERT INTO users (public_id, email, password, name) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [id, email, password, name],
    });
    
    return result.rows[0];
  }


  async addResume(resume_id,recruiter_id,candidate_name,candidate_email,contact_number,city,country,years_of_experience,expertise,current_company,location_preference){

    const result = await DB.query({
      text: "INSERT INTO talentpoolresumes( resume_id,recruiter_id,candidate_name,candidate_email,contact_number,city,country,years_of_experience,expertise,current_company,location_preference) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      values: [resume_id,recruiter_id,candidate_name,candidate_email,contact_number,city,country,years_of_experience,expertise,current_company,location_preference],
    });

    return result.rows[0];
    
  }


  async getAllResumes(recruiter_id){

    const result = await DB.query({
      text: "SELECT * FROM talentpoolresumes WHERE recruiter_id = $1",
      values: [recruiter_id],
    });

    return result.rows;
  }

  async getResumeById(resume_id,recruiter_id){

    const result = await DB.query({
      text: "SELECT * FROM talentpoolresumes WHERE resume_id = $1 AND recruiter_id = $2",
      values: [resume_id,recruiter_id],
    });

    return result.rows[0];
  }


  async getAllTalentPoolResumes(recruiter_id){

    const result = await DB.query({
      text: "SELECT * FROM talentpoolresumes WHERE recruiter_id = $1 LIMIT 2",
      values: [recruiter_id],
    });

    return result.rows;
  }


  async updateResume(resume_id, updateData){
    const fields = Object.keys(updateData);
  const values = Object.values(updateData);

  const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ');
  const queryText = `UPDATE talentpoolresumes SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE resume_id = $1 RETURNING *`;

  const result = await DB.query({
    text: queryText,
    values: [resume_id, ...values],
  });

  return result.rows[0];
  }
}

module.exports = Repository;
