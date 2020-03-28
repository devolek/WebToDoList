package main;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import main.model.ToDo;

public class Storage {
    private static int currentId = 1;
    private static HashMap<Integer, ToDo> toDoList = new HashMap();

    public Storage() {
    }

    public static List<ToDo> getToDoList() {
        return new ArrayList(toDoList.values());
    }

    public static synchronized int addToDo(ToDo toDo) {
        int id = currentId++;
        toDo.setId(id);
        toDoList.put(id, toDo);
        return id;
    }

    public static synchronized ToDo getToDo(int toDoId) {
        return toDoList.containsKey(toDoId) ? (ToDo)toDoList.get(toDoId) : null;
    }

    public static synchronized int deleteToDo(int toDoId) {
        if (toDoList.containsKey(toDoId)) {
            toDoList.remove(toDoId);
            return toDoId;
        } else {
            return 0;
        }
    }

    public static synchronized ToDo updateToDo(int toDoId, ToDo toDo) {
        if (toDoList.containsKey(toDoId)) {
            toDoList.replace(toDoId, (ToDo)toDoList.get(toDoId), toDo);
            return toDo;
        } else {
            return null;
        }
    }
}