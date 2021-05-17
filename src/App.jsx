import React from 'react'
import { Container, Card, Button, Modal } from 'react-bootstrap';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import GlobalStyle from './theme/globalStyles';

const initChirps = [
    {
        key: uuidv4(),
        username: 'Leonardo',
        content: `I'm going to order a pizza 🍕`,
        date: 1620274875000
    },
    {
        key: uuidv4(),
        username: 'Michaelangelo',
        content: `Cowabunga 🐢`,
        date: 1620278475000
    },
    {
        key: uuidv4(),
        username: 'Raphael',
        content: `Duuuuuude! 🤘`,
        date: 1620279615000
    }
]

class App extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            chirps: initChirps,
            username: '',
            chirpContent: '',
            chirpContentPlaceholder: '',
            show: false
        }
        this.chirpContentRef = React.createRef();
    }

    handleClose = () => {
        this.setState({ show: false, chirpContent: '' });
    }

    handleShow = () => {
        this.setState({ show: true });        
    }

    handleChirp = () => {
        if (this.state.username && this.state.chirpContent !== '') {
            this.handleClose();
            this.setState({ chirps: [
                ...this.state.chirps,
                {
                    key: uuidv4(),
                    username: this.state.username,
                    content: this.state.chirpContent,
                    date: Date.now()
                }
            ]})
            this.setState({ chirpContent: '' });
        } else {
            this.setState({ chripContentPlaceholder: 'Please make sure you have set your username and provided Chrip content.' });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevState.show) {
            this.chirpContentRef.current.focus();
        }
    }
    
    render() {
        return (
            <>
                <GlobalStyle />
                <nav className="navbar sticky-top navbar-dark bg-info p-3 mb-5">
                    <div className="container-fluid">
                        <div className="navbar-brand">🐦 Chirper</div>
                        <div className="d-flex">
                            <Button variant="warning" onClick={this.handleShow}>Chirp</Button>
                        </div>
                    </div>
                </nav>
                <Container>
                    
                    <div className="row justify-content-center">
                        <div className="col-sm-4">
                            {this.state.chirps.map(val => {
                                return (
                                    <Card key={val.key} className="rounded-3 mb-3">
                                        <Card.Body>
                                            <Card.Title>@{val.username.toLowerCase()}</Card.Title>
                                            <Card.Text>
                                                {val.content}
                                            </Card.Text>
                                            <Card.Text>
                                                <small className="text-muted">{moment(val.date).calendar()}</small>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                    )
                            }).reverse()}
                        </div>
                    </div>
                </Container>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title>What's happening?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <textarea className="form-control border-0" id="chirpContent" rows="3" ref={this.chirpContentRef} onChange={e => this.setState({ chirpContent: e.target.value })} placeholder={this.state.chirpContent} value={this.state.chirpContent} />
                    </Modal.Body>
                    <Modal.Footer className="justify-content-between">
                        <div className="input-group w-50">
                            <span className="input-group-text" id="basic-addon1">@</span>
                            <input id="username" value={this.state.username} type="text" className="form-control" placeholder="Username" aria-label="Username" onChange={e => this.setState({ username: e.target.value })} />
                        </div>
                        <div className="d-flex">
                            <Button variant="secondary" className="me-2" onClick={this.handleClose}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={this.handleChirp}>
                                Chirp
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </>
        )
    } 
}

export default App