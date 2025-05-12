import './createEmployee.scss'
import { useState, useRef, useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import NavButton from '../../components/NavButton'
// import { useCreateEmployee } from '../../utils/hooks/useCreateEmployee' // avant zustand
import { useEmployeeStore } from '../../store/employeeStore'
import { useFormIsEmpty } from '../../utils/hooks/useFormIsEmpty'
import { formatEmployeeData } from '../../utils/tools/employeeFormatters'
import PersonalInfoSection from '../../components/FormSections/PersonalInfoSection'
import AddressSection from '../../components/FormSections/AddressSection'
import InternalInfoSection from '../../components/FormSections/InternalInfoSection'
import { getRegisterOptions } from '../../components/FormSections/formConfig'
import { Modal } from '@ptdx/modal'

function CreateEmployee() {
    const { register, handleSubmit, formState: { errors, isSubmitted }, reset, setValue, control, trigger } = useForm({ mode: "onchange" })
    // const { saveEmployee } = useCreateEmployee() // avant zustand
    const addEmployee = useEmployeeStore((state) => state.addEmployee); // via Zustand
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

        // saveEmployee(formattedData); // Envoi de la donnée à l'API ou à la base // avant zustand
        addEmployee(formattedData); // via Zustand
        setSaveModalContent(`Employee ${formattedData.firstName} ${formattedData.lastName} Created!`);
        setShowSaveModal(true) // Affiche la modal de confirmation
        console.log(formattedData);

        reset();
    };

    const registerOptions = getRegisterOptions(dateOfBirth);

    const formRef = useRef(null);

    // Navigation au clavier dans le formulaire avec la touche ENTER
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Enter') {
                const form = formRef.current;
                if (!form) return;

                const isReactSelectInput = e.target.classList.contains('select__input') ||
                    e.target.getAttribute('aria-expanded') !== null ||
                    e.target.closest('.select__control');

                if (isReactSelectInput) return;

                let focusableElements = Array.from(
                    form.querySelectorAll('input')
                ).filter(el => !el.disabled && el.offsetParent !== null);


                const index = focusableElements.indexOf(document.activeElement);

                if (index > -1 && index < focusableElements.length - 1) {
                    e.preventDefault();
                    focusableElements[index + 1].focus();
                }
            }
        };

        const formElement = formRef.current;
        formElement?.addEventListener('keydown', handleKeyDown);

        return () => {
            formElement?.removeEventListener('keydown', handleKeyDown);
        };
    }, [isFormEmpty]); // <= ❗ important


    return (
        <>
            <h1 className='pageTitle'>Add New Employee</h1>
            <main className='formCreateEmployee'>
                <form id="create-employee" onSubmit={handleSubmit(onSubmit)} autoComplete="off" ref={formRef}>
                    <div className='containerForm'>
                        <PersonalInfoSection
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            control={control}
                            registerOptions={registerOptions}
                            trigger={trigger}
                            isSubmitted={isSubmitted}
                            formRef={formRef}
                        />

                        <AddressSection
                            register={register}
                            errors={errors}
                            setValue={setValue}
                            control={control}
                            registerOptions={registerOptions}
                            trigger={trigger}
                            isSubmitted={isSubmitted}
                            formRef={formRef}
                        />

                        <InternalInfoSection
                            control={control}
                            errors={errors}
                            registerOptions={registerOptions}
                            trigger={trigger}
                            isSubmitted={isSubmitted}
                            formRef={formRef}
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
                    title="Success"
                    showFooter={false}
                    content={saveModalContent}
                    className="custom-modal"
                // variant='success'
                />

                <Modal
                    isOpen={showClearConfirmModal}
                    onClose={() => setShowClearConfirmModal(false)}
                    onConfirm={handleConfirmClear}
                    title="Confirmation"
                    confirmText="Yes, Clear"
                    content="Are you sure to clear the form?"
                    className="custom-modal"
                />

            </main >
        </>
    )
}

export default CreateEmployee;