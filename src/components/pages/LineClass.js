import React from "react"
import { Button, Form, Modal, Table } from 'react-bootstrap';

class LineClass extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            status: '',
            linhas: [],
            modalAberta: false
        };

        this.buscarLinhas = this.buscarLinhas.bind(this);
        this.buscarLinha = this.buscarLinha.bind(this);
        this.inserirLinha = this.inserirLinha.bind(this);
        this.atualizarLinha = this.atualizarLinha.bind(this);
        this.renderTabela = this.renderTabela.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.atualizaNome = this.atualizaNome.bind(this);
        this.atualizaStatus = this.atualizaStatus.bind(this);
    }

    componentDidMount() {
        this.buscarLinhas();
    }

    // GET (todas as linhas)
    buscarLinhas() {
        fetch('http://localhost:5000/LineClass')
            .then(response => response.json())
            .then(data => this.setState({ linhas: data }));
    }

    //GET (linha com determinado id)
    buscarLinha(id) {
        fetch('http://localhost:5000/LineClass/' + id)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    id: data.id,
                    name: data.name,
                    status: data.status
                }));
    }

    inserirLinha = (linha) => {
        fetch('http://localhost:5000/LineClass', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(linha)
        }).then((resposta) => {

            if (resposta.ok) {
                this.buscarLinhas();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        }).catch(console.log);
    }

    atualizarLinha(linha) {
        fetch('http://localhost:5000/LineClass/' + linha.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(linha)
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
                    <Modal.Title>Preencha os dados do tipo de Linha</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="modalForm" onSubmit={this.submit}>
                        <Form.Group>
                            <Form.Label>linha</Form.Label>
                            <Form.Control required type='text' placeholder='Tipo de Linha' value={this.state.name} onChange={this.atualizaNome} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Status</Form.Label>
                            <Form.Select required name="status" value={this.state.status} onChange={this.atualizaStatus}>
                                <option>Selecione</option>
                                <option value="1">Ativo</option>
                                <option value="0">Inativo</option>
                            </Form.Select>
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
                        <th>Tipo de Linha</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.linhas.map((linha) => (
                            <tr key={linha.id}>
                                <td>{linha.name} </td>
                                <td>
                                    <Button variant="btn btn-outline-secondary" onClick={() => this.abrirModalAtualizar(linha.id)}>Atualizar</Button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>

        )

    }


    atualizaNome(e) {
        this.setState({
            name: e.target.value
        });
    }

    atualizaStatus(e) {
        this.setState({
            status: e.target.value
        });
    }

    abrirModalInserir() {
        this.setState({
            modalAberta: true
        })
    }

    abrirModalAtualizar(id) {
        this.setState({
            id: id,
            modalAberta: true
        });

        this.buscarLinha(id);
    }

    fecharModal() {
        this.setState({
            id: 0,
            name: "",
            status: "",
            modalAberta: false
        })
    }

    submit = () => {
        const linha = {
            id: this.state.id,
            name: this.state.name,
            status: this.state.status
        };

        if (this.state.id === 0) {
            this.inserirLinha(linha);
        } else {
            this.atualizarLinha(linha);
        }
    }

    render() {
        return (
            <div>
                <br />
                <Button variant="primary" className="button-novo" onClick={this.abrirModalInserir}>Adicionar linha</Button>
                {this.renderTabela()}
                {this.renderModal()}
            </div>


        )
    }

}
export default LineClass