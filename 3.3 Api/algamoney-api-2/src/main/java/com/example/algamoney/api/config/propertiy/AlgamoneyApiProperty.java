package com.example.algamoney.api.config.propertiy;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("algamoney")
public class AlgamoneyApiProperty {

	private String originPermitida = "http://localhost:8000";

	private final Seguranca seguranca = new Seguranca();

	public Seguranca getSeguranca() {
		return seguranca;
	}

	public String getOriginPermitida() {
		return originPermitida;
	}

	public void setOriginPermitida(String originPermitida) {
		this.originPermitida = originPermitida;
	}

	public static class Seguranca {
		private boolean enableHttp;

		public boolean isEnableHttp() {
			return enableHttp;
		}

		public void setEnableHttp(boolean enableHttp) {
			this.enableHttp = enableHttp;
		}

	}

}
