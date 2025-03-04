// components/dashboard/upcoming-tasks.tsx
"use client";

import { useState } from "react";
import { Plus, X, Clock, Edit, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { format, isToday, isTomorrow, addDays, isBefore } from "date-fns";

// Define task type
interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  priority: "Low" | "Medium" | "High";
  related?: {
    type: "Patient" | "Appointment" | "Lab" | "Inventory";
    id: string;
    name: string;
  };
}

const getTasks = (): Task[] => {
  // In a real app, this would be fetched from your API
  const today = new Date();

  return [
    {
      id: "task-001",
      title: "Call Sarah Johnson about lab results",
      dueDate: today,
      completed: false,
      priority: "High",
      related: {
        type: "Patient",
        id: "pat-123",
        name: "Sarah Johnson",
      },
    },
    {
      id: "task-002",
      title: "Review lab order for David Kim",
      dueDate: today,
      completed: false,
      priority: "Medium",
      related: {
        type: "Lab",
        id: "lab-002",
        name: "Implant Order",
      },
    },
    {
      id: "task-003",
      title: "Restock disposable gloves",
      dueDate: addDays(today, 1),
      completed: false,
      priority: "Low",
      related: {
        type: "Inventory",
        id: "inv-056",
        name: "Disposable Gloves",
      },
    },
    {
      id: "task-004",
      title: "Prepare for Emma Rodriguez surgery",
      dueDate: addDays(today, 2),
      completed: false,
      priority: "High",
      related: {
        type: "Appointment",
        id: "apt-008",
        name: "Tooth Extraction",
      },
    },
    {
      id: "task-005",
      title: "Follow up with new patients from last week",
      dueDate: addDays(today, 1),
      completed: false,
      priority: "Medium",
    },
    {
      id: "task-006",
      title: "Staff meeting preparation",
      dueDate: addDays(today, 3),
      completed: false,
      priority: "Medium",
    },
  ];
};

// Get priority badge color
const getPriorityBadge = (priority: Task["priority"]) => {
  const styles = {
    Low: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    Medium: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  return styles[priority];
};

// Format due date in a user-friendly way
const formatDueDate = (date: Date) => {
  if (isToday(date)) {
    return "Today";
  } else if (isTomorrow(date)) {
    return "Tomorrow";
  } else {
    return format(date, "MMM d, yyyy");
  }
};

export default function UpcomingTasks() {
  const [tasks, setTasks] = useState<Task[]>(getTasks());
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Toggle task completion
  const toggleTaskCompletion = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Add new task
  const addTask = () => {
    if (newTaskTitle.trim() === "") return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      dueDate: new Date(),
      completed: false,
      priority: "Medium",
    };

    setTasks([newTask, ...tasks]);
    setNewTaskTitle("");
    setIsAddingTask(false);
  };

  // Get overdue tasks
  const getOverdueTasks = () => {
    return tasks.filter(
      (task) =>
        !task.completed &&
        isBefore(task.dueDate, new Date()) &&
        !isToday(task.dueDate)
    );
  };

  // Check if a task is overdue
  const isTaskOverdue = (task: Task) => {
    return (
      !task.completed &&
      isBefore(task.dueDate, new Date()) &&
      !isToday(task.dueDate)
    );
  };

  // Sort tasks by due date and priority
  const sortedTasks = [...tasks].sort((a, b) => {
    if (isTaskOverdue(a) && !isTaskOverdue(b)) return -1;
    if (!isTaskOverdue(a) && isTaskOverdue(b)) return 1;
    if (a.dueDate.getTime() !== b.dueDate.getTime()) {
      return a.dueDate.getTime() - b.dueDate.getTime();
    }
    const priorityWeight = { High: 0, Medium: 1, Low: 2 };
    return priorityWeight[a.priority] - priorityWeight[b.priority];
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {getOverdueTasks().length > 0 && (
              <Badge variant="destructive" className="mr-2">
                {getOverdueTasks().length} overdue
              </Badge>
            )}
            {tasks.filter((t) => !t.completed).length} pending tasks
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsAddingTask(!isAddingTask)}
        >
          {isAddingTask ? (
            <>
              <X className="h-4 w-4 mr-1" />
              Cancel
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </>
          )}
        </Button>
      </div>

      {isAddingTask && (
        <div className="flex space-x-2">
          <Input
            placeholder="Enter new task..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addTask();
              if (e.key === "Escape") {
                setIsAddingTask(false);
                setNewTaskTitle("");
              }
            }}
            className="flex-1"
            autoFocus
          />
          <Button onClick={addTask} disabled={newTaskTitle.trim() === ""}>
            Add
          </Button>
        </div>
      )}

      <ScrollArea className="h-[250px]">
        <div className="space-y-2">
          {sortedTasks.map((task) => (
            <div
              key={task.id}
              className={`
                flex items-start space-x-2 p-2 rounded-md border 
                hover:bg-muted/50 transition-colors
                ${task.completed ? "opacity-60 bg-muted/30" : ""}
                ${
                  isTaskOverdue(task)
                    ? "border-red-300 dark:border-red-800"
                    : ""
                }
              `}
            >
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => toggleTaskCompletion(task.id)}
                className="mt-1"
              />

              <div className="flex-1 space-y-1">
                <div className="flex items-start justify-between">
                  <span
                    className={`font-medium ${
                      task.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {task.title}
                  </span>
                  <Badge className={getPriorityBadge(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>

                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span
                      className={
                        isTaskOverdue(task) ? "text-red-500 font-medium" : ""
                      }
                    >
                      {isTaskOverdue(task) && (
                        <AlertCircle className="h-3 w-3 mr-1 text-red-500" />
                      )}
                      {formatDueDate(task.dueDate)}
                    </span>
                  </div>

                  {task.related && (
                    <div className="flex items-center">
                      <span>
                        {task.related.type}: {task.related.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit task</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
