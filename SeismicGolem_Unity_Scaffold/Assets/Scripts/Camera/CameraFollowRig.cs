using UnityEngine;

namespace SeismicGolem.Camera
{
    public sealed class CameraFollowRig : MonoBehaviour
    {
        [SerializeField] private Transform target;
        [SerializeField] private Vector3 offset = new(0f, 12f, -8f);
        [SerializeField] private float followLerp = 8f;

        private void LateUpdate()
        {
            if (target == null)
            {
                return;
            }

            var targetPosition = target.position + offset;
            transform.position = Vector3.Lerp(transform.position, targetPosition, followLerp * Time.deltaTime);
        }
    }
}
