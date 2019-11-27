package com.example.algamoney.api.model;

import javax.annotation.Generated;
import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;

@Generated(value = "org.hibernate.jpamodelgen.JPAMetaModelEntityProcessor")
@StaticMetamodel(Contato.class)
public abstract class Contato_ {

	public static volatile SingularAttribute<Contato, Long> codigo;
	public static volatile SingularAttribute<Contato, String> telefone;
	public static volatile SingularAttribute<Contato, Pessoa> pessoa;
	public static volatile SingularAttribute<Contato, String> nome;
	public static volatile SingularAttribute<Contato, String> email;

	public static final String CODIGO = "codigo";
	public static final String TELEFONE = "telefone";
	public static final String PESSOA = "pessoa";
	public static final String NOME = "nome";
	public static final String EMAIL = "email";

}

