import React from "react"
import { Button, Form, Modal, Table } from 'react-bootstrap';


class User extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            nome: '',
            email: '',
            usuarios: [],
            modalAberta: false
        };

        this.buscarUsuarios = this.buscarUsuarios.bind(this);
        this.buscarUsuario = this.buscarUsuario.bind(this);
        this.inserirUsuario = this.inserirUsuario.bind(this);
        this.atualizarUsuario = this.atualizarUsuario.bind(this);
        this.excluirUsuario = this.excluirUsuario.bind(this);
        this.renderTabela = this.renderTabela.bind(this);
        this.abrirModalInserir = this.abrirModalInserir.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.atualizaNome = this.atualizaNome.bind(this);
        this.atualizaEmail = this.atualizaEmail.bind(this);
        this.atualizaFuncao = this.atualizaFuncao.bind(this);
    }


    componentDidMount() {
        this.buscarUsuarios();
    }

    // GET (todos usuários)
    buscarUsuarios() {
        fetch('http://localhost:5000/User')
            .then(response => response.json())
            .then(data => this.setState({ usuarios: data }));
    }


    //GET (Usuário com determinado id)
    buscarUsuario(id) {
        fetch('http://localhost:5000/User/' + id)
            .then(response => response.json())
            .then(data => this.setState(
                {
                    id: data.id,
                    nome: data.nome,
                    email: data.email,
                    funcao: data.funcao
                }));
    }

    inserirUsuario = (User) => {
        fetch('http://localhost:5000/User', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(User)
        }).then((resposta) => {

            if (resposta.ok) {
                this.buscarUsuarios();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        }).catch(console.log);
    }

    atualizarUsuario(User) {
        fetch('http://localhost:5000/User/' + User.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(User)
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarUsuarios();
                this.fecharModal();
            } else {
                alert(JSON.stringify(resposta));
            }
        });
    }


    excluirUsuario = (id) => {
        fetch('http://localhost:5000/User/' + id, {
            method: 'DELETE',
        }).then((resposta) => {
            if (resposta.ok) {
                this.buscarUsuarios();
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
                    <Modal.Title>Preencha os dados do Usuário</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form id="modalForm" onSubmit={this.submit}>
                        <Form.Group>
                            <Form.Label>Nome</Form.Label>
                            <Form.Control required type='text' placeholder='Nome do User' value={this.state.nome} onChange={this.atualizaNome} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control required type='email' placeholder='Email' value={this.state.email} onChange={this.atualizaEmail} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Função</Form.Label>
                            <Form.Select name="funcao" value={this.state.funcao} onChange={this.atualizaFuncao}>
                                <option>Selecione</option>
                                <option value="operator">operator</option>
                                <option value="manager">manager</option>
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
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Função</th>
                        <th>Opções</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.usuarios.map((User) => (
                            <tr key={User.id}>
                                <td>{User.nome} </td>
                                <td>{User.email}</td>
                                <td>{User.funcao}</td>
                                <td>
                                    <Button variant="btn btn-outline-secondary" onClick={() => this.abrirModalAtualizar(User.id)}>Atualizar</Button>
                                    &nbsp;
                                    <Button variant="btn btn-outline-danger" onClick={() => this.excluirUsuario(User.id)}>Excluir</Button>

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
            nome: e.target.value
        });
    }


    atualizaEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    atualizaFuncao(e) {
        this.setState({
            funcao: e.target.value
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

        this.buscarUsuario(id);
    }


    fecharModal() {
        this.setState({
            id: 0,
            nome: "",
            email: "",
            funcao: "",
            modalAberta: false
        })
    }

    submit = () => {
        const User = {
            id: this.state.id,
            nome: this.state.nome,
            email: this.state.email,
            funcao: this.state.funcao
        };

        if (this.state.id === 0) {
            this.inserirUsuario(User);
        } else {
            this.atualizarUsuario(User);
        }
    }


    render() {
        return (
            <div>
                <br />
                <Button variant="btn btn-primary" className="button-novo" onClick={this.abrirModalInserir}>Adicionar Usuário</Button>
                {this.renderTabela()}
                {this.renderModal()}
            </div>


        )
    }


}
export default User