package com.example.algamoney.api.service;

import java.io.InputStream;
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.example.algamoney.api.dto.LancamentoEstatisticaPessoa;
import com.example.algamoney.api.model.Lancamento;
import com.example.algamoney.api.model.Pessoa;
import com.example.algamoney.api.repository.LancamentoRepository;
import com.example.algamoney.api.repository.PessoaRepository;
import com.example.algamoney.api.service.exception.PessoaInesistenteOuInvativaException;

import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class LancamentoService {

	@Autowired
	private LancamentoRepository lancamentoRepository;

	@Autowired
	private PessoaRepository pessoaRepository;

	/**
	 * "0 43 10 * * *"
	 * 
	 * 10 => em qual hora sera executado
	 * 43 => em qual minuto sera executado
	 * 0 => executa no segundo 0, se tiver em * vai executar ate o tempo acabar
	 * 
	 * (* * *) => dia do mes, o mes, dia da semana (seg, ter ...)
	 * 
	 * o cron é para uma chamada por horario, todos os dias sera chamado 
	 * 
	 * "0 43 10 5 * *"
	 * 
	 * o cron é para uma chamada por horario, sera chamado no dia 5
	 * 
	 * "0 43 10 5 1 *"
	 * 
	 * o cron é para uma chamada por horario, sera chamado no dia 5 do mes de janeiro
	 */
	@Scheduled(cron = "0 0 6 * * *")
	public void avisarSobreLancamentosVencidos() {
		System.out.println(">>>>>>>>>>>>>metodo sendo executado");
	}

	/**
	 * chama o metodo a cada 2 segundos, comecando quando termina a outra chamada,
	 * comeca no segundo 0 e depois de 2 segundo chama novamente, caso a chamada
	 * anterior tenha estrapolado o tempo, como se tivesse passo 5 segundos, o
	 * metodo so sera chamado novamente apos o termino
	 * 
	 * @param inicio
	 * @param fim
	 * @return
	 * @throws Exception
	 */
//	@Scheduled(fixedDelay = 1000 * 2)
//	public void avisarSobreLancamentosVencidos() {
//		System.out.println(">>>>>>>>>>>>>metodo sendo executado");
//	}

	public byte[] relatorioPorPessoa(LocalDate inicio, LocalDate fim) throws Exception {
		List<LancamentoEstatisticaPessoa> dados = this.lancamentoRepository.porPessoa(inicio, fim);

		Map<String, Object> parametros = new HashMap<>();

		parametros.put("DT_INICIO", Date.valueOf(inicio));
		parametros.put("DT_FIM", Date.valueOf(fim));
		parametros.put("REPORT_LOCALE", new Locale("pt", "BR"));

		InputStream inputStream = this.getClass().getResourceAsStream("/relatorios/lancamentos_por_pessoa.jasper");

		JasperPrint jasperPrint = JasperFillManager.fillReport(inputStream, parametros,
				new JRBeanCollectionDataSource(dados));

		return JasperExportManager.exportReportToPdf(jasperPrint);
	}

	public Lancamento salvar(Lancamento lancamento) {
		Pessoa pessoa = this.pessoaRepository.findOne(lancamento.getPessoa().getCodigo());
		if (pessoa == null || pessoa.isInativo()) {
			throw new PessoaInesistenteOuInvativaException();
		}

		return this.lancamentoRepository.save(lancamento);
	}

	public Lancamento atualizar(Long codigo, Lancamento lancamento) {
		Lancamento lancamentoSalvo = buscarLancamentoExistente(codigo);
		if (!lancamento.getPessoa().equals(lancamentoSalvo.getPessoa())) {
			validarPessoa(lancamento);
		}

		BeanUtils.copyProperties(lancamento, lancamentoSalvo, "codigo");

		return this.lancamentoRepository.save(lancamentoSalvo);
	}

	private void validarPessoa(Lancamento lancamento) {
		Pessoa pessoa = null;
		if (lancamento.getPessoa() != null) {
			pessoa = this.pessoaRepository.findOne(lancamento.getPessoa().getCodigo());
		}
		if (pessoa == null || pessoa.isInativo()) {
			throw new PessoaInesistenteOuInvativaException();
		}
	}

	private Lancamento buscarLancamentoExistente(Long codigo) {
		Lancamento lancamentoSalvo = this.lancamentoRepository.findOne(codigo);
		if (lancamentoSalvo == null) {
			throw new IllegalArgumentException();
		} else {
			return lancamentoSalvo;
		}
	}

}
