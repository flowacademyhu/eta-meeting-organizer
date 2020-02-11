package hu.flowacademy.meetingorganizer.Resource;


import hu.flowacademy.meetingorganizer.persistence.model.User;
import hu.flowacademy.meetingorganizer.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public User getOne(@PathVariable("userId") Long userId) {
        return userService.findById(userId);
    }


    @DeleteMapping("/{id}")
    public void delete(@PathVariable("userId") Long userId) {
        userService.deleteUser(userId);
    }





}
