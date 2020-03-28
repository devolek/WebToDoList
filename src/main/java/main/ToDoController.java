package main;
import main.model.ToDo;
import main.model.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ToDoController {

    @Autowired
    private ToDoRepository toDoRepository;

    //Get ToDo list
    @GetMapping({"/todolist"})
    public List<ToDo> list() {
        Iterable<ToDo> toDoIterable = toDoRepository.findAll();
        ArrayList<ToDo> toDoList = new ArrayList<>();
        toDoIterable.forEach(toDoList::add);
        return toDoList;
    }

    //Add ToDo
    @PostMapping({"/todolist"})
    public int add(ToDo toDo) {
        ToDo newToDo = toDoRepository.save(toDo);
        return newToDo.getId();
    }

    //Get ToDo
    @GetMapping({"/todolist/{id}"})
    public ResponseEntity get(@PathVariable int id) {
        Optional<ToDo> toDoOptional = toDoRepository.findById(id);
        return !toDoOptional.isPresent() ? ResponseEntity.status(HttpStatus.NOT_FOUND).body(null) :
                new ResponseEntity(toDoOptional.get(), HttpStatus.OK);
    }

    //Delete ToDo
    @DeleteMapping({"/todolist/{id}"})
    public ResponseEntity delete(@PathVariable int id) {
        if(!toDoRepository.findById(id).isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        toDoRepository.deleteById(id);
        return new ResponseEntity(id, HttpStatus.OK);
    }

    //Change ToDo
    @PutMapping({"/todolist/{id}"})
    public ResponseEntity put(@PathVariable int id, ToDo toDo) {
        Optional<ToDo> toDoOptional = toDoRepository.findById(id);
        if(!toDoOptional.isPresent()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        ToDo newToDo = toDoOptional.get();
        newToDo.setName(toDo.getName());
        newToDo.setContent(toDo.getContent());
        toDoRepository.save(newToDo);
        return new ResponseEntity(newToDo, HttpStatus.OK);
    }

}
