import './home.scss';
import useInitEmployees from '../../hooks/useInitEmployees';
import AddUser from '../../assets/img/addUserWhite.webp';
import ListUsers from '../../assets/img/listUsersWhite.webp';
import NavButton from '../../components/NavButton';
import { useState } from 'react';
import Modal from '../../components/Modal';
import Modal2 from '../../components/Modal/index2';

function Home() {
    useInitEmployees();




    // test
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState(null)

    const handleSave = (e) => {
        e.preventDefault()

        const data = {
            test: e.target.test.value,
        }

        setFormData(data) // Stocker les données du formulaire

        onSubmit(data) // Envoi des données à retirer si on utilise handleConfirmSubmit

        setShowModal(true) // Afficher la modal de confirmation
    }

    const handleConfirmSubmit = () => {
        if (formData) {
            onSubmit(formData) // Soumettre les données
            setShowModal(false) // Fermer la modal
            setFormData(null) // Réinitialiser les données
        }
    }

    const onSubmit = (data) => {
        console.log('Soumission confirmée :', data)
    }
    // fin test


    return (
        <main className="home">
            <h1>Welcome to your employee records management system</h1>
            <nav className="navHome">
                <NavButton
                    to="/createemployee"
                    icon={AddUser}
                    alt="icon add user"
                    text="Add New Employee"
                    className="btnHome"
                />
                <NavButton
                    to="/listemployees"
                    icon={ListUsers}
                    alt="icon user list"
                    text="View Current Employees"
                    className="btnHome"
                />
            </nav>

            {/* <button onClick={() => setShowModal(true)}>Supprimer un élément</button>
            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirm}
                title="Confirmation"
                width="400px"
                showFooter={true}
                confirmText="Oui, supprimer"
                cancelText="Annuler"
            >
                <p>Es-tu sûr de vouloir supprimer cet élément ?</p>
            </Modal> */}


            {/* <Modal2
                triggerText="Info"
                onConfirm={handleConfirm}
                title="Titre"
                content="L’action a bien été effectuée."
                showFooter={true}
            /> */}


            {/* test */}
            <div style={{ width: '200px' }}>
                <h2>Test modal</h2>

                <form onSubmit={handleSave}>
                    <input type="text" name="test" id="test" placeholder="Entrez un nom" />
                    <button type='submit'>Save</button>
                </form>

                <Modal
                    isOpen={showModal}
                    onClose={() => setShowModal(false)}
                    // onConfirm={handleConfirmSubmit}
                    title="Confirmation"
                    // confirmText="Yes, save"
                    // cancelText="Cancel"
                    showFooter={false}
                    content="Are you sure you want to save this new employee?"
                />
            </div>
            {/* fin test */}


        </main>
    );
}

export default Home;