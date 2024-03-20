import { db } from './index.js';
import generateOTP from './utils/generateOTP.js';
import sendOTPMailWithBrevo from './utils/sendOTP.js'

export const sendOTP = async (req, res) => {
  const { email } = req.body;
  const otp = generateOTP();

  const response = await sendOTPMailWithBrevo(email, otp);
  if (response.status === 200) {
      const sql = `INSERT INTO otp (email, otp) VALUES (?, ?)`;
      await db.query(sql, [email, otp], (err, result) => {
          if (err) throw err;
          console.log('OTP saved to database');
        });    
        res.status(200).json({ message: 'OTP sent successfully', response });
    } else {
        res.status(500).json({ message : "Not able to send OTP ", response});
    }
};


export const validateOTP = async (req, res) => {
  const { email, otp } = req.body;

  const sql = `SELECT * FROM otp WHERE email = ? AND otp = ?`;
  await db.query(sql, [email, otp], async (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      
    //   Delete the otp after validating
      const deleteSql = `DELETE FROM otp WHERE email = ?`;
      await db.query(deleteSql, [email], (err) => {
        if (err) throw err;
        console.log('OTP record deleted from database');
      });

    //   savie otp after validating
      const insertSql = `INSERT INTO users (email, fullname, password) VALUES (?, ?, ?)`;
        connection.query(insertSql, [email, fullname, password], (err) => {
          if (err) {
            callback(err, false);
            return;
          }
          callback(null, true);
      });
      res.status(200).json({ message: 'OTP validated successfully' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  });
};
