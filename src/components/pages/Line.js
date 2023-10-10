
import React from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';

class Line extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            idInc: 0,

            id: '',
            name: '',

            lineNumber: '',
            visa: '',
            seats: '',
            masterCode: '',
            lineClass: '',
            bu: '',
            companyId: '',
            cityId: '',
            consortium: '',
            status: '',

            linhas: [],
            empresas: [],
            tipos: [],
            cidades: [],
            consorcios: [],
            modalAberta: false,
            modalAtualizacao: false
        };

        this.buscarLinhas = this.buscarLinhas.bind(this);
        this.buscarLinha = this.buscarLinha.bind(this);
        this.inserirLinha = this.inserirLinha.bind(this);
        this.atualizarLinha = this.atualizarLinha.bind(this);
        this.renderTabela = this.renderTabela.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.fecharModal = this.fecharModal.bind(this);

        this.buscarEmpresas = this.buscarEmpresas.bind(this);
        this.buscarTipos = this.buscarTipos.bind(this);
        this.buscarCidades = this.buscarCidades.bind(this);
        this.buscarConsorcios = this.buscarConsorcios.bind(this);

        this.atualizaId = this.atualizaId.bind(this);
        this.atualizaLNumber = this.atualizaLNumber.bind(this);
        this.atualizaVisa = this.atualizaVisa.bind(this);
        this.atualizaSeats = this.atualizaSeats.bind(this);
        this.atualizaMCode = this.atualizaMCode.bind(this);
        this.atualizaLClass = this.atualizaLClass.bind(this);
        this.atualizaBu = this.atualizaBu.bind(this);
        this.atualizaCompanyId = this.atualizaCompanyId.bind(this);
        this.atualizaCityId = this.atualizaCityId.bind(this);
        this.atualizaConsortium = this.atualizaConsortium.bind(this);
        this.atualizaStatus = this.atualizaStatus.bind(this);
    }


    componentDidMount() {
        this.buscarLinhas();
        this.buscarEmpresas();
        this.buscarTipos();
        this.buscarCidades();
        this.buscarConsorcios();
    }

    // GET (todas as linhas)
    buscarLinhas() {
        fetch('http://localhost:5000/Line')
            .then(response => response.json())
            .then(data => this.setState({ linhas: data }));
    }

    // GET (todas as empresa)
    buscarEmpresas() {
        fetch('http://localhost:5000/Company')
            .then(response => response.json())
            .then(data => this.setState({ empresas: data }));
    }

    // GET (todos os tipos)
    buscarTipos() {
        fetch('http://localhost:5000/LineClass')
            .then(response => response.json())
            .then(data => this.setState({ tipos: data }));
    }

    // GET (todas as cidades)
    buscarCidades() {
        fetch('http://localhost:5000/City')
            .then(response => response.json())
            .then(data => this.setState({ cidades: data }));
    }


    // GET (todas os Consorcio)
    buscarConsorcios() {
        fetch('http://localhost:5000/Consortium')
            .then(response => response.json())
            .then(data => this.setState({ consorcios: data }));
    }

    //GET (Line com determinado id)
    buscarLinha(id) {
        fetch('http://localhost:5000/Line/' + id)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    idInc: data.idInc,
                    id: data.id,
                    lineNumber: data.lineNumber,
                    visa: data.visa,
                    seats: data.seats,
                    masterCode: data.masterCode,
                    lineClass: data.lineClass,
                    bu: data.bu,
                    companyId: data.companyId,
                    cityId: data.cityId,
                    consortium: data.consortium,
                    status: data.status
                }));
    }

    inserirLinha = (Line) => {
        fetch('http://localhost:5000/Line', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Line)
        }).then((resposta) => {

            if (resposta.ok) {
                this.buscarLinhas();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        }).catch(console.log);
    }

    atualizarLinha(Line) {
        fetch('http://localhost:5000/Line/' + Line.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Line)
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarLinhas();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        });
    }

    renderModal() {
        return (
            <Modal show={this.state.modalAberta} onHide={this.fecharModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Preencha os dados da Linha</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="modalForm" onSubmit={this.submit}>
                        <Form.Group>
                            <Form.Label>Código Detalhado</Form.Label>
                            <Form.Control disabled={this.state.modalAtualizacao} required type='number' placeholder='Código Detalhado' value={this.state.id} onChange={this.atualizaId} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Empresa</Form.Label>
                            <Form.Select required name="companyId" value={this.state.companyId} onChange={this.atualizaCompanyId}>
                                <option>Selecione</option>
                                {
                                    this.state.empresas.map((Empresa) => (
                                        <option value={Empresa.id}>{Empresa.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Linha</Form.Label>
                            <Form.Control required type='text' placeholder='Número da Linha' value={this.state.lineNumber} onChange={this.atualizaLNumber} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Vista</Form.Label>
                            <Form.Control required type='text' placeholder='Vista' value={this.state.visa} onChange={this.atualizaVisa} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tipo</Form.Label>
                            <Form.Select required name="lineClass" value={this.state.lineClass} onChange={this.atualizaLClass}>
                                <option>Selecione</option>
                                {
                                    this.state.tipos.map((Tipo) => (
                                        <option value={Tipo.id}>{Tipo.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Cidade</Form.Label>
                            <Form.Select name="cityId" value={this.state.cityId} onChange={this.atualizaCityId}>
                                <option>Todas</option>
                                {
                                    this.state.cidades.map((Cidade) => (
                                        <option value={Cidade.id}>{Cidade.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Código Master</Form.Label>
                            <Form.Control required type='number' placeholder='Codigo Master' value={this.state.masterCode} onChange={this.atualizaMCode} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bilhete Único</Form.Label>
                            <Form.Select name="bu" value={this.state.bu} onChange={this.atualizaBu}>
                                <option>Selecione</option>
                                <option value="1">Sim</option>
                                <option value="0">Não</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select required name="status" value={this.state.status} onChange={this.atualizaStatus}>
                                <option>Selecione</option>
                                <option value="1">Ativo</option>
                                <option value="0">Inativo</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Consórcio</Form.Label>
                            <Form.Select name="consortium" value={this.state.consortium} onChange={this.atualizaConsortium}>
                                <option>Selecione</option>
                                {
                                    this.state.consorcios.map((Consorcio) => (
                                        <option value={Consorcio.id}>{Consorcio.name}</option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Assentos</Form.Label>
                            <Form.Control type='number' placeholder='Quantidade de Assentos ' value={this.state.seats} onChange={this.atualizaSeats} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.fecharModal}>
                        Cancelar
                    </Button>
                    <Button variant="primary" form="modalForm" type="submit">
                        Confirmar
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }



    renderTabela() {
        return (
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Código Detalhado</th>
                        <th>Linha</th>
                        <th>Vista</th>
                        <th>Empresa</th>
                        <th>Tipo</th>
                        <th>Municipio</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.linhas.map((Line) => (
                            <tr key={Line.id}>
                                <td>{Line.id} </td>
                                <td>{Line.lineNumber} </td>
                                <td>{Line.visa} </td>
                                <td>{Line.companyId} </td>
                                <td>{Line.lineClass} </td>
                                <td>{Line.cityId} </td>
                                <td>
                                    <Button variant="btn btn-outline-secondary" onClick={() => this.abrirModalAtualizar(Line.id)}>Atualizar</Button>

                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>

        )

    }

    atualizaId(e) {
        this.setState({
            id: e.target.value
        });
    }

    atualizaLNumber(e) {
        this.setState({
            lineNumber: e.target.value
        });
    }

    atualizaVisa(e) {
        this.setState({
            visa: e.target.value
        });
    }

    atualizaSeats(e) {
        this.setState({
            seats: e.target.value
        });
    }

    atualizaMCode(e) {
        this.setState({
            masterCode: e.target.value
        });
    }

    atualizaLClass(e) {
        this.setState({
            lineClass: e.target.value
        });
    }

    atualizaBu(e) {
        this.setState({
            bu: e.target.value
        });
    }

    atualizaCompanyId(e) {
        this.setState({
            companyId: e.target.value
        });
    }

    atualizaCityId(e) {
        this.setState({
            cityId: e.target.value
        });
    }

    atualizaConsortium(e) {
        this.setState({
            consortium: e.target.value
        });
    }

    atualizaStatus(e) {
        this.setState({
            status: e.target.value
        });
    }


    abrirModalInserir() {
        this.setState({
            modalAberta: true,
            modalAtualizacao: false
        })
    }

    abrirModalAtualizar(id) {
        this.setState({
            id: id,
            modalAberta: true,
            modalAtualizacao: true 
        });

        this.buscarLinha(id);
    }


    fecharModal() {
        this.setState({
            id: "",
            lineNumber: "",
            visa: "",
            seats: "",
            masterCode: "",
            lineClass: "",
            bu: "",
            companyId: "",
            cityId: "",
            consortium: "",
            status: "",
            name: "",
            modalAberta: false
        })
    }

    submit = () => {
        const Line = {
            id: this.state.id,
            lineNumber: this.state.lineNumber,
            visa: this.state.visa.toUpperCase(),
            seats: this.state.seats,
            masterCode: this.state.masterCode,
            lineClass: this.state.lineClass,
            bu: this.state.bu,
            ticketValue: this.state.ticketValue,
            companyId: this.state.companyId,
            cityId: this.state.cityId,
            consortium: this.state.consortium,
            status: this.state.status
        };

        if (this.state.idInc === 0) {
            this.inserirLinha(Line);
        } else {
            this.atualizarLinha(Line);
        }
        
    }



    render() {
        return (
            <div>
                <br />
                <Button variant="primary" className="button-novo" onClick={this.abrirModalInserir}>Adicionar Linha</Button>
                {this.renderTabela()}
                {this.renderModal()}
            </div>


        )
    }


}
export default Line