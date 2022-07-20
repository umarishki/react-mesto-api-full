import PopupWithForm from "./PopupWithForm";

function ConfirmDeletionPopup({ buttonTitle, card, onDeleteCard, isOpen, onClose }) {

    function handleSubmit(e) {
        e.preventDefault();
        onDeleteCard(card);
    }

    return (
        <PopupWithForm
            name="confirm-deletion"
            title="Вы уверены?"
            buttonTitle={buttonTitle}
            onSubmit={handleSubmit}
            isOpened={isOpen}
            onClose={onClose}
        >
        </PopupWithForm>
    )
}

export default ConfirmDeletionPopup;