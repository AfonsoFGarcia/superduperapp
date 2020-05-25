package pt.afonsogarcia.superduperapp.api

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.builder.SpringApplicationBuilder
import org.springframework.boot.runApplication
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer

@SpringBootApplication
class SuperDuperAppApiApplication : SpringBootServletInitializer() {
	override fun configure(builder: SpringApplicationBuilder): SpringApplicationBuilder {
		return builder.sources(SuperDuperAppApiApplication::class.java)
	}
}

fun main(args: Array<String>) {
	runApplication<SuperDuperAppApiApplication>(*args)
}