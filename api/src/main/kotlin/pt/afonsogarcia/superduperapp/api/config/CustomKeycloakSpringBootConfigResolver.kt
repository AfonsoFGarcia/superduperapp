package pt.afonsogarcia.superduperapp.api.config

import org.keycloak.adapters.KeycloakDeployment
import org.keycloak.adapters.KeycloakDeploymentBuilder
import org.keycloak.adapters.spi.HttpFacade
import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver
import org.keycloak.adapters.springboot.KeycloakSpringBootProperties
import org.springframework.context.annotation.Configuration

@Configuration
class CustomKeycloakSpringBootConfigResolver(properties: KeycloakSpringBootProperties) : KeycloakSpringBootConfigResolver() {
    private var keycloakDeployment:KeycloakDeployment = KeycloakDeploymentBuilder.build(properties)

    override fun resolve(facade: HttpFacade.Request) : KeycloakDeployment {
        return keycloakDeployment
    }
}