import React from "react"
import { Button, Form, Modal, Table } from 'react-bootstrap';

class Consortium extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            consorcios: [],
            modalAberta: false
        };

        this.buscarConsorcios   = this.buscarConsorcios.bind(this);
        this.buscarConsorcio    = this.buscarConsorcio.bind(this);
        this.inserirConsorcio   = this.inserirConsorcio.bind(this);
        this.atualizarConsorcio = this.atualizarConsorcio.bind(this);
        this.excluirConsorcio   = this.excluirConsorcio.bind(this);
        this.renderTabela       = this.renderTabela.bind(this);
        this.abrirModalInserir  = this.abrirModalInserir.bind(this);
        this.fecharModal        = this.fecharModal.bind(this);
        this.atualizaNome       = this.atualizaNome.bind(this);
    }

    componentDidMount() {
        this.buscarConsorcios();
    }

    // GET (todas as consorcios)
    buscarConsorcios() {
        fetch('http://localhost:5000/Consortium')
            .then(response => response.json())
            .then(data => this.setState({ consorcios: data }));
    }

    //GET (consorcio com determinado id)
    buscarConsorcio(id) {
        fetch('http://localhost:5000/Consortium/' + id)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    id:     data.id,
                    name:   data.name
                }));
    }

    inserirConsorcio = (consorcio) => {
        fetch('http://localhost:5000/Consortium', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(consorcio)
        }).then((resposta) => {

            if (resposta.ok) {
                this.buscarConsorcios();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        }).catch(console.log);
    }

    atualizarConsorcio(consorcio) {
        fetch('http://localhost:5000/Consortium/' + consorcio.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(consorcio)
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarConsorcios();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        });
    }

    excluirConsorcio = (id) => {
        fetch('http://localhost:5000/Consortium/' + id, {
            method: 'DELETE',
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarConsorcios();
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
                    <Modal.Title>Preencha os dados da consórcio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="modalForm" onSubmit={this.submit}>
                        <Form.Group>
                            <Form.Label>consorcio</Form.Label>
                            <Form.Control required type='text' placeholder='Nome da consórcio' value={this.state.name} onChange={this.atualizaNome} />
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
                        <th>consorcio</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        this.state.consorcios.map((consorcio) => (
                            <tr key={consorcio.id}>
                                <td>{consorcio.name} </td>
                                <td>
                                    <Button variant="btn btn-outline-secondary" onClick={() => this.abrirModalAtualizar(consorcio.id)}>Atualizar</Button>
                                    &nbsp;
                                    <Button variant="btn btn-outline-danger" onClick={() => this.excluirConsorcio(consorcio.id)}>Excluir</Button>
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

        this.buscarConsorcio(id);
    }

    fecharModal() {
        this.setState({
            id: 0,
            name: "",
            modalAberta: false
        })
    }

    submit = () => {
        const consorcio = {
            id: this.state.id,
            name: this.state.name
        };

        if (this.state.id === 0) {
            this.inserirConsorcio(consorcio);
        } else {
            this.atualizarConsorcio(consorcio);
        }
    }

    render() {
        return (
            <div>
                <br />
                <Button variant="primary" className="button-novo" onClick={this.abrirModalInserir}>Adicionar consorcio</Button>
                {this.renderTabela()}
                {this.renderModal()}
            </div>


        )
    }

}
export default Consortium