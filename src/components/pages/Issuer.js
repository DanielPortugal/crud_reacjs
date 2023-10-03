import React from "react"
import { Button, Form, Modal, Table } from 'react-bootstrap';

class Issuer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            emissores: [],
            modalAberta: false
        };

        this.buscarEmissores    = this.buscarEmissores.bind(this);
        this.buscarEmissor      = this.buscarEmissor.bind(this);
        this.inserirEmissor     = this.inserirEmissor.bind(this);
        this.atualizarEmissor   = this.atualizarEmissor.bind(this);
        this.excluirEmissor     = this.excluirEmissor.bind(this);
        this.renderTabela       = this.renderTabela.bind(this);
        this.abrirModalInserir  = this.abrirModalInserir.bind(this);
        this.fecharModal        = this.fecharModal.bind(this);
        
        this.atualizaNome       = this.atualizaNome.bind(this);
    }

    componentDidMount() {
        this.buscarEmissores();
    }

    // GET (todas as emissores)
    buscarEmissores() {
        fetch('http://localhost:5000/Issuer')
            .then(response => response.json())
            .then(data => this.setState({ emissores: data }));
    }

    //GET (emissor com determinado id)
    buscarEmissor(id) {
        fetch('http://localhost:5000/Issuer/' + id)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    id:     data.id,
                    name:   data.name
                }));
    }

    inserirEmissor = (emissor) => {
        fetch('http://localhost:5000/Issuer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emissor)
        }).then((resposta) => {

            if (resposta.ok) {
                this.buscarEmissores();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        }).catch(console.log);
    }

    atualizarEmissor(emissor) {
        fetch('http://localhost:5000/Issuer/' + emissor.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(emissor)
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarEmissores();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        });
    }

    excluirEmissor = (id) => {
        fetch('http://localhost:5000/Issuer/' + id, {
            method: 'DELETE',
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarEmissores();
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
                    <Modal.Title>Preencha os dados da emissor</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="modalForm" onSubmit={this.submit}>
                        <Form.Group>
                            <Form.Label>emissor</Form.Label>
                            <Form.Control required type='text' placeholder='Nome da emissor' value={this.state.name} onChange={this.atualizaNome} />
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
                        <th>emissor</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.emissores.map((emissor) => (
                            <tr key={emissor.id}>
                                <td>{emissor.name} </td>
                                <td>
                                    <Button variant="btn btn-outline-secondary" onClick={() => this.abrirModalAtualizar(emissor.id)}>Atualizar</Button>
                                    &nbsp;
                                    <Button variant="btn btn-outline-danger" onClick={() => this.excluirEmissor(emissor.id)}>Excluir</Button>
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

        this.buscarEmissor(id);
    }

    fecharModal() {
        this.setState({
            id: 0,
            name: "",
            modalAberta: false
        })
    }

    submit = () => {
        const emissor = {
            id: this.state.id,
            name: this.state.name
        };

        if (this.state.id === 0) {
            this.inserirEmissor(emissor);
        } else {
            this.atualizarEmissor(emissor);
        }
    }

    render() {
        return (
            <div>
                <br />
                <Button variant="primary" className="button-novo" onClick={this.abrirModalInserir}>Adicionar emissor</Button>
                {this.renderTabela()}
                {this.renderModal()}
            </div>


        )
    }

}
export default Issuer