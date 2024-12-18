import Task from "../models/task.js"

export const newTask = async (req, res) => {
    const { title, description, due } = req.body;
  
    if (!title || !description || !due) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the required details",
      });
    }
    const dueDateUTC = new Date(due).toISOString(); // Converts the provided date to UTC format
  
    // Create a new task with the UTC date
    const task = await Task.create({
      title,
      description,
      owner: req.id,
      due: dueDateUTC,  // Save the due date in UTC
    });
  
    res.status(200).json({
      success: true,
      message: "New task created successfully",
    });
};

export const getTask= async (req,res)=>{
  const id=req.id
  const tasks=await Task.find({owner:id})

  tasks.forEach((task)=>{
    console.log(task.timeLeft)
  })

  res.status(200).json({
    success:true,
    message:tasks
  })
}