import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendMail = async (to, task) => {
  const mailOptions = {
    from: '"Task Manager" <noreply@taskmanager.com>',
    to,
    subject: `⏰ Reminder: Task "${task.title}" Due Soon!`,
    html: `
      <div style="font-family: 'Arial', sans-serif; background: #f9f9f9; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <div style="background: #007BFF; color: #fff; padding: 20px 15px; text-align: center;">
            <h1 style="margin: 0; font-size: 1.5rem;">⏰ Task Reminder</h1>
          </div>
          <!-- Body -->
          <div style="padding: 20px;">
            <p style="font-size: 1rem; margin-bottom: 15px;">Hello,</p>
            <p style="font-size: 1rem; margin-bottom: 15px;">
              This is a friendly reminder that your task 
              <strong>"${task.title}"</strong> is approaching its due time.
            </p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
              <tr>
                <td style="padding: 8px; font-weight: bold; background: #f3f4f6; border-bottom: 1px solid #ddd;">Task Title:</td>
                <td style="padding: 8px; background: #fafafa; border-bottom: 1px solid #ddd;">${task.title}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; background: #f3f4f6; border-bottom: 1px solid #ddd;">Description:</td>
                <td style="padding: 8px; background: #fafafa; border-bottom: 1px solid #ddd;">${task.description || "No description provided."}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold; background: #f3f4f6;">Due Date:</td>
                <td style="padding: 8px; background: #fafafa;">${new Date(task.due).toLocaleString()}</td>
              </tr>
            </table>
            <p style="margin-top: 20px; text-align: center;">
              <a href="https://your-task-manager.com/tasks/${task._id}" 
                 style="padding: 10px 20px; font-size: 1rem; color: #fff; background: #007BFF; border: none; text-decoration: none; border-radius: 4px; display: inline-block;">
                View Task
              </a>
            </p>
          </div>
          <!-- Footer -->
          <div style="background: #f1f1f1; padding: 15px; text-align: center; font-size: 0.85rem; color: #555;">
            <p style="margin: 0;">This is an automated message from <strong>Task Manager</strong>.</p>
            <p style="margin: 5px 0;">Manage your tasks better at <a href="https://your-task-manager.com" style="color: #007BFF;">Task Manager</a>.</p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
