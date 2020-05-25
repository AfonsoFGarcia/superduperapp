package pt.afonsogarcia.superduperapp.api.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.annotation.security.RolesAllowed

@RestController
@RequestMapping("/api/test")
class TestController {

    @RolesAllowed("user")
    @GetMapping("hello")
    fun hello():String {
        return "Hello there!"
    }
}