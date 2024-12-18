const fetchTasks = async () => {
    try {
      const tasks = await Task.find({ status: "Pending" }).populate("owner");
      tasks.forEach((task) => {
        console.log(`Task ${task.title} has timeLeft: ${task.timeLeft}`);
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  const fetchTasksArrivingSoon = async () => {
    try {
      const tasks = await Task.find({ status: "Pending" }).populate("owner");
      tasks.forEach((task) => {
        console.log(`Task ${task.title} has timeLeft: ${task.timeLeft}`); // Logging each task's timeLeft
        if (task.timeLeft >= 0 && task.timeLeft <= 1800) {
          console.log(
            `Task ${task.title} is arriving soon with timeLeft: ${task.timeLeft}`
          );
        }
      });
      console.log("hi");
    } catch (err) {
      console.log(err);
    }
  };