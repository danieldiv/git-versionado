package com.example.algamoney.api.config;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import com.example.algamoney.api.config.propertiy.AlgamoneyApiProperty;

@Configuration
public class MailConfig {
	
	@Autowired
	private AlgamoneyApiProperty property;

	@Bean
	public JavaMailSender javaMailSender() {
		Properties props = new Properties();
		props.put("mail.transport.protocol", "smtp");//protocolo
		props.put("mail.smtp.auth", true);//autenticado
		props.put("mail.smtp.starttls", true);//transport la.. secure
		props.put("mail.smtp.connectiontimeout", 10000);//quanto tempo esperar para o envio de email (10 segundos)
		
		JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
		mailSender.setJavaMailProperties(props);
		mailSender.setHost(property.getMail().getHost());
		mailSender.setPort(property.getMail().getPort());
		mailSender.setUsername(property.getMail().getUsername());
		mailSender.setPassword(property.getMail().getPassword());
		
		return mailSender;
	}
}
