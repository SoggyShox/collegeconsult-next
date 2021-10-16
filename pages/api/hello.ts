// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import sgMail from '@sendgrid/mail';

type Data = {
  name: string
}

sgMail.setApiKey(String(process.env.SEND_GRID_API_KEY))

export default function handler(req, res) {
  if (req.method === 'POST') {
    console.log("hello")
    console.log(req.body);
    
    sendInviteEmail(req.body)
  
    res.send()
  }
}

async function sendInviteEmail(requestbody) {
  const email = {
    to: requestbody.requester_email,
    from: "college.student.connect@gmail.com",
    templateId: "d-99b7df016e644601ae451fab725f7c52",
    dynamicTemplateData: { 
      requester_firstname: requestbody.requester_firstname,
      consultant_firstname: requestbody.consultant_firstname,
      requester_subject: requestbody.requester_subject,
      requester_duration: requestbody.requester_duration,
      school_name: requestbody.school_name
    }
  };
  try{
  sgMail.send(email);
  }
  catch(error){
    console.log(error)
    console.log(error.message)
  }
}
