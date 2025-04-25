import './createEmployee.scss'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import NavButton from '../../components/NavButton'
import Modal from '../../components/Modal'
import { useCreateEmployee } from '../../utils/hooks/useCreateEmployee'
import { useFormIsEmpty } from '../../utils/hooks/useFormIsEmpty'
import { formatEmployeeData } from '../../utils/tools/employeeFormatters'
import PersonalInfoSection from '../../components/FormSections/PersonalInfoSection'
import AddressSection from '../../components/FormSections/AddressSection'
import InternalInfoSection from '../../components/FormSections/InternalInfoSection'
import { getRegisterOptions } from '../../components/FormSections/formConfig'

function CreateEmployee() {
    const { register, handleSubmit, formState: { errors }, reset, setValue, control, trigger } = useForm({ mode: "all" })
    const { saveEmployee } = useCreateEmployee()
    const dateOfBirth = useWatch({ control, name: "dateOfBirth" });

    const [showSaveModal, setShowSaveModal] = useState(false)
    const [showClearConfirmModal, setShowClearConfirmModal] = useState(false);
    const [saveModalContent, setSaveModalContent] = useState("Employee Created!");

    // Observer les valeurs du formulaire avec useWatch
    const formValues = useWatch({ control });

    // useEffect pour mettre à jour isFormEmpty chaque fois que formValues change
    const isFormEmpty = useFormIsEmpty(formValues);

    // Fonction de confirmation de Clear
    const handleConfirmClear = () => {
        reset(); // Reset le formulaire
        setShowClearConfirmModal(false); // Ferme la modal
    };

    // Fonction onSubmit
    const onSubmit = (data) => {

        const formattedData = formatEmployeeData(data);

        saveEmployee(formattedData); // Envoi de la donnée à l'API ou à la base
        setSaveModalContent(`Employee ${formattedData.firstName} ${formattedData.lastName} Created!`);
        setShowSaveModal(true) // Affiche la modal de confirmation
        console.log(formattedData);

        reset();
    };

    const registerOptions = getRegisterOptions(dateOfBirth);

    return (
        <>
            <h1 className='pageTitle'>Add New Employee</h1>
            <main className='formCreateEmployee'>
                <form id="create-employee" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                    <div className='containerForm'>
                        <PersonalInfoSection
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            control={control}
                            registerOptions={registerOptions}
                            trigger={trigger}
                        />

                        <AddressSection
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            control={control}
                            registerOptions={registerOptions}
                            trigger={trigger}
                        />

                        <InternalInfoSection
                            control={control}
                            errors={errors}
                            registerOptions={registerOptions}
                        />

                    </div>
                    <div className='containerBtn'>

                        {/* Submit Button */}
                        <NavButton
                            type="submit"
                            text="Save"
                            className="btnForm"
                        />

                        {/* Clear Button, only shown if form is not empty */}
                        {(!isFormEmpty || Object.keys(errors).length > 0) && (
                            <NavButton
                                type="button"
                                text="Clear"
                                className="btnForm btnClear"
                                onClick={() => setShowClearConfirmModal(true)}
                            />
                        )}
                    </div>
                </form >

                <Modal
                    isOpen={showSaveModal}
                    onClose={() => setShowSaveModal(false)}
                    title="Confirmation"
                    showFooter={false}
                    content={saveModalContent}
                    className="custom-modal"
                />

                <Modal
                    isOpen={showClearConfirmModal}
                    onClose={() => setShowClearConfirmModal(false)}
                    onConfirm={handleConfirmClear}
                    title="Confirmation"
                    confirmText="Yes, Clear"
                    showFooter={true}
                    content="Are you sure to clear the form?"
                    className="custom-modal"
                />

            </main >
        </>
    )
}

export default CreateEmployee;