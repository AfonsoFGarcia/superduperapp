package pt.afonsogarcia.superduperapp.api.config

import org.keycloak.adapters.KeycloakConfigResolver
import org.keycloak.adapters.springboot.KeycloakSpringBootProperties
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper
import org.springframework.security.core.session.SessionRegistryImpl
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(jsr250Enabled = true)
class KeycloakSecurityConfig : KeycloakWebSecurityConfigurerAdapter() {
    override fun configure(http: HttpSecurity) {
        super.configure(http)
        http
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .anyRequest()
                .fullyAuthenticated()
    }

    @Autowired
    fun configureGlobal(auth: AuthenticationManagerBuilder) {
        val provider:KeycloakAuthenticationProvider = keycloakAuthenticationProvider()
        provider.setGrantedAuthoritiesMapper(SimpleAuthorityMapper())
        auth.authenticationProvider(provider)
    }

    @Bean
    override fun sessionAuthenticationStrategy(): SessionAuthenticationStrategy {
        return RegisterSessionAuthenticationStrategy(SessionRegistryImpl())
    }

    @Bean
    @Primary
    fun keycloakConfigResolver(springBootProperties: KeycloakSpringBootProperties):KeycloakConfigResolver {
        return CustomKeycloakSpringBootConfigResolver(springBootProperties)
    }
}

