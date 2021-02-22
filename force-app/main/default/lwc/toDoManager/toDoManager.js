/**
 * ToDoManager.js
 * Support: set the time functions/ get the greeting/ add tasks
 * @author Rami Zuhairi
 */
import { LightningElement, track } from "lwc";
import getCurrentTodos from "@salesforce/apex/ToDoController.getCurrentTodos";
import addTodo from "@salesforce/apex/ToDoController.addTodo"; // to import  methods from Apex class (addTodo)// now we have to call it from addToDoHandler
export default class ToDoManager extends LightningElement {
  @track time = "8:15 PM"; // USING TRACK IMPORTANT TO TRACK CHANGES IN JS FILE AND REFLECT IT IN HTML FILE
  @track greeting = "Good Eveing ";
  @track todos = []; // simply we will add to do list whenever the addTodoHandler called
  //this method part of lwc framwork , very nice will coll methods on load
  connectedCallback() {
    //now the time is static , we need to reload the page every time the time is moves
    this.populateTodos();
    //this.getTime();
    this.fetchTodos();
    setInterval(() => {
      this.getTime();
    }, 1000); // refresh every one min
  }
  //we need to get time by getting the mins and hours
  getTime() {
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    //here we have to use the time in this format to get it in right way by calling the methods
    this.time = `${this.getHour(hour)}:${this.getDoubleDigit(
      min
    )}  ${this.getMidDay(hour)}`;
    // same for the greeting
    this.setGreeting(hour);
  }
  // get hour in normal format way
  getHour(hour) {
    return hour == 0 ? 12 : hour > 12 ? hour - 12 : hour;
  }
  getMidDay(hour) {
    return hour >= 12 ? "PM" : "AM";
  }
  // converting if the number less than 10 , eg: 9 => 09
  getDoubleDigit(digit) {
    return digit < 10 ? "0" + digit : digit;
  }
  //method to get the Greeting based on local time
  setGreeting(hour) {
    if (hour < 12) {
      this.greeting = "Good Morming ";
    } else if (hour >= 12 && hour < 17) {
      this.greeting = "Good Afternoon ";
    } else {
      this.greeting = "Good Evening ";
    }
  }
  addTodoHandler() {
    // input box to get the value from input from the user
    const inputBox = this.template.querySelector("lightning-input"); // to get the element

    // now lets make it more profiinal instead of adding data as one value we will retuen that as object
    const todo = {
      todoName: inputBox.value,
      done: false
    };
    //now we need to call addTodo Apex class method , and add the payload in string format, and put todo object inside of it
    // then we have to put it in promise and get the response also catch the error
    console.log("Item todo"+todo);
    addTodo({ payload: JSON.stringify(todo) })
      .then((result) => {
        console.log("Item insearted successfully");
        console.log("result" + result);
        this.fetchTodos();
       
        if (result) {
          console.log("Tasks added");
          //fetch fresh list of todos
          this.fetchTodos();
        }
      })
      .catch((err) => {
        console.error("Error in adding todo  " + err);
        console.log(err);
      });

    //this.todos.push(todo); // pushing the object to array
    //after adding value , the input field should be empty again
    inputBox.value = "";
  }

  /**
   * Fetch todos from server (getCurrentTodos)
   * This method only retrives todos for today
   */
  fetchTodos() {
    getCurrentTodos().then((result) => {
        if (result !== undefined) {
          //update todos property with result
          console.log("Retrive todos from server", result.length);
          this.todos = result;
        }
      }).catch((error) => {
        console.error("Error in fetching todos" + error);
      });
  }

  /**
   * Fetch fresh list of todos once todo is updated
   * This method is called on update event
   * @param {*} event
   */
  updateTodoHandler(event) {
    if (event) {
      this.fetchTodos();
    }
  }

  /**
   * Fetch fresh list of todos once todo is deleted
   * This method is called on delete event
   * @param {*} event
   */
  deleteTodoHandler(event) {
    if (event) {
      this.fetchTodos();
    }
  }

  // get will help us to saprate value of upcoming tasks and completed , this method must return value at the end
  get upcomingTodos() {
    // in retuen we said , if its no empty and it has some lenth , then use filter to retuen all not done tasks
    return this.todos && this.todos.length
      ? this.todos.filter((todo) => !todo.done) // return only not done items from todo object
      : []; // else retuen blank
    // now we have to go to foreach in html and put that list upcomingTasks  instead of todos
  }
  get completedTodos() {
    // in retuen we said , if its no empty and it has some length , then use filter to retuen all Done tasks
    return this.todos && this.todos.length
      ? this.todos.filter((todo) => todo.done)
      : [];
    // now we have to go to foreach in html and put that list completedTasks  instead of todos
  }
  //Get input box size based on current screen width
  get largePageSize() {
    return this.flexipageRegionWidth === "SMALL"
      ? "12"
      : this.flexipageRegionWidth === "MEDIUM"
      ? "8"
      : "6";
  }

  populateTodos() {
    const todos = [
      {
        rodoId: 0,
        todoName: "Finish LWC Tech Task ",
        done: false,
        todoDate: new Date()
      },
      {
        rodoId: 1,
        todoName: "Send Email to client",
        done: false,
        todoDate: new Date()
      },
      {
        rodoId: 2,
        todoName: "send email to manager",
        done: true,
        todoDate: new Date()
      }
    ];
    this.todos = todos;
  }
}
