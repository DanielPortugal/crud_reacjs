import React from 'react'
import { Button, Form, Modal, Table } from 'react-bootstrap';



class City extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            status: '',
            cidades: [],
            modalAberta: false
        };

        this.buscarCidades = this.buscarCidades.bind(this);
        this.buscarCidade = this.buscarCidade.bind(this);
        this.inserirCidade = this.inserirCidade.bind(this);
        this.atualizarCidade = this.atualizarCidade.bind(this);
        this.renderTabela = this.renderTabela.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.atualizaNome = this.atualizaNome.bind(this);
        this.atualizaStatus = this.atualizaStatus.bind(this);

    }

    componentDidMount() {
        this.buscarCidades();
    }

    // GET (todas as Cidades)
    buscarCidades() {
        fetch('http://localhost:5000/City')
            .then(response => response.json())
            .then(data => this.setState({ cidades: data }));
    }

    //GET (Cidade com determinado id)
    buscarCidade(id) {
        fetch('http://localhost:5000/City/' + id)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    id: data.id,
                    name: data.name,
                    status: data.status
                }));
    }

    inserirCidade = (cidade) => {
        fetch('http://localhost:5000/City', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cidade)
        }).then((resposta) => {

            if (resposta.ok) {
                this.buscarCidades();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        }).catch(console.log);
    }

    atualizarCidade(cidade) {
        fetch('http://localhost:5000/City/' + cidade.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cidade)
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarCidades();
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
                    <Modal.Title>Preencha os dados da cidade</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="modalForm" onSubmit={this.submit}>
                        <Form.Group>
                            <Form.Label>Cidade</Form.Label>
                            <Form.Control required type='text' placeholder='Nome da Cidade' value={this.state.name} onChange={this.atualizaNome} />
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
                        <th>Cidade</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.cidades.map((cidade) => (
                            <tr key={cidade.id}>
                                <td>{cidade.name} </td>
                                <td>
                                    <Button variant="btn btn-outline-secondary" onClick={() => this.abrirModalAtualizar(cidade.id)}>Atualizar</Button>
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

        this.buscarCidade(id);
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
        const cidade = {
            id: this.state.id,
            name: this.state.name,
            status: this.state.status
        };

        if (this.state.id === 0) {
            this.inserirCidade(cidade);

        } else {
            this.atualizarCidade(cidade);

        }
    }

    render() {
        return (
            <div>
                <br />
                <Button variant="primary" className="button-novo" onClick={this.abrirModalInserir}>Adicionar Cidade</Button>
                <p></p>
                {this.renderTabela()}
                {this.renderModal()}

            </div>


        )
    }

}
export default City