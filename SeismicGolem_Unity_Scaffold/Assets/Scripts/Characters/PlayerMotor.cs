using UnityEngine;

namespace SeismicGolem.Characters
{
    public sealed class PlayerMotor : MonoBehaviour
    {
        [SerializeField] private float moveSpeed = 4f;
        [SerializeField] private float rotationSpeed = 12f;

        private Vector3 currentMoveDirection;

        public void SetMoveInput(Vector3 moveInput)
        {
            currentMoveDirection = Vector3.ClampMagnitude(moveInput, 1f);
        }

        private void Update()
        {
            if (currentMoveDirection.sqrMagnitude <= 0.0001f)
            {
                return;
            }

            transform.position += currentMoveDirection * (moveSpeed * Time.deltaTime);
            var targetRotation = Quaternion.LookRotation(currentMoveDirection, Vector3.up);
            transform.rotation = Quaternion.Slerp(transform.rotation, targetRotation, rotationSpeed * Time.deltaTime);
        }
    }
}
