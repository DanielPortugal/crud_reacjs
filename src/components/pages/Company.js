import React from "react"
import { Button, Form, Modal, Table } from 'react-bootstrap';

class Company extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            idInc: 0,
            id: '',
            name: '',
            createdAt: '',
            updatedAt: '',
            empresas: [],
            modalAberta: false
        };

        this.buscarEmpresas = this.buscarEmpresas.bind(this);
        this.buscarEmpresa = this.buscarEmpresa.bind(this);
        this.inserirEmpresa = this.inserirEmpresa.bind(this);
        this.atualizarEmpresa = this.atualizarEmpresa.bind(this);
        this.excluirEmpresa = this.excluirEmpresa.bind(this);
        this.renderTabela = this.renderTabela.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.atualizaId = this.atualizaId.bind(this);
        this.atualizaNome = this.atualizaNome.bind(this);

    }

    componentDidMount() {
        this.buscarEmpresas();
    }

    // GET (todas as Empresas)
    buscarEmpresas() {
        fetch('http://localhost:5000/Company')
            .then(response => response.json())
            .then(data => this.setState({ empresas: data }));
    }

    //GET (Empresa com determinado id)
    buscarEmpresa(id) {
        fetch('http://localhost:5000/Company/' + id)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    idInc: data.idInc,
                    id: data.id,
                    name: data.name,
                    createdAt: data.createdAt,
                    updatedAt: data.updatedAt
                }));
    }

    inserirEmpresa = (empresa) => {
        fetch('http://localhost:5000/Company', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empresa)
        }).then((resposta) => {


            if (resposta.ok) {
                this.buscarEmpresas();
                this.fecharModal();

            } else {
                alert(JSON.stringify(resposta));
            }
        }).catch(console.log);
    }

    atualizarEmpresa(empresa) {
        fetch('http://localhost:5000/Company/' + empresa.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(empresa)
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarEmpresas();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        });
    }

    excluirEmpresa = (id) => {
        fetch('http://localhost:5000/Company/' + id, {
            method: 'DELETE',
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarEmpresas();
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
                    <Modal.Title>Preencha os dados da Empresa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="modalForm" onSubmit={this.submit}>
                        <Form.Group>
                            <Form.Label>Identificação</Form.Label>
                            <Form.Control required type='number' placeholder='Identificação' value={this.state.id} onChange={this.atualizaId} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Empresa</Form.Label>
                            <Form.Control required type='text' placeholder='Nome da Empresa' value={this.state.name} onChange={this.atualizaNome} />
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
                        <th>Identificação</th>
                        <th>Empresa</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.empresas.map((empresa) => (
                            <tr key={empresa.id}>
                                <td>{empresa.id} </td>
                                <td>{empresa.name.toUpperCase()} </td>
                                <td>
                                    <Button variant="btn btn-outline-secondary" onClick={() => this.abrirModalAtualizar(empresa.id)}>Atualizar</Button>
                                    &nbsp;
                                    <Button variant="btn btn-outline-danger" onClick={() => this.excluirEmpresa(empresa.id)}>Excluir</Button>
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

    atualizaNome(e) {
        this.setState({
            name: e.target.value
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

        this.buscarEmpresa(id);
    }

    fecharModal() {
        this.setState({
            id: 0,
            name: "",
            modalAberta: false
        })
    }

    submit = () => {
        const empresa = {
            id: this.state.id,
            name: this.state.name.toUpperCase(),
            createdAt: this.state.createdAt,
            updatedAt: new Date()
        };

        if (this.state.idInc === 0) {
            this.inserirEmpresa(empresa);
        } else {
            this.atualizarEmpresa(empresa);
        }
    }

    render() {
        return (
            <div>
                <br />
                <Button variant="primary" className="button-novo" onClick={this.abrirModalInserir}>Adicionar Empresa</Button>
                {this.renderTabela()}
                {this.renderModal()}
            </div>


        )
    }

}
export default Company