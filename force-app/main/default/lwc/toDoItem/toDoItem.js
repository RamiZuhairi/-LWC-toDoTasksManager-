/**
 * ToDoListItem component
 * Represents an item with some styling based on item status
 * @author Rami Zuhairi
 */

import { LightningElement, api } from "lwc";
import updateTodo from "@salesforce/apex/ToDoController.updateTodo";
import deleteTodo from "@salesforce/apex/ToDoController.deleteTodo";
export default class ToDoItem extends LightningElement {
  // now after creating the child todoItem , we need to create logic that will take the value from the parent html input to child
  // and to do that we need to use public property and for that we can use api
  @api todoId;
  @api todoName;
  @api done = false;

  updateHandler() {
    const todo = {
      todoId: this.todoId,
      todoName: this.todoName,
      done: !this.done
    };
    updateTodo({ payload: JSON.stringify(todo) })
      .then((result) => {
       
          console.log("Item Updated successfully!");
          const updateEvent = new CustomEvent('update');
          this.dispatchEvent(updateEvent);
        
      })
      .catch((error) => {
        console.error("Error in Update todo", error);
      });
  }
  deleteHandler() {
    deleteTodo({ todoId: this.todoId })
      .then((result) => {
        console.log("Item Deleted successfully!");
        const deleteEvent = new CustomEvent('delete');
        this.dispatchEvent(deleteEvent);
       
      })
      .catch((error) => {
        console.error("Error can not delete !", error);
      });
  }

  // now we will usethe awsome fun get to sprate athe css wether is done or not done colors , retuen 2 classes names todo and completd or upcoming
  get containerChild() {
    return this.done ? "todo completed" : "todo upcoming";
  }

  get iconName() {
    return this.done ? "utility:check" : "utility:add";
  }
}
