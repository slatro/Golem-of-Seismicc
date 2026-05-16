using UnityEngine;

namespace SeismicGolem.Enemies
{
    public sealed class EnemyBrain : MonoBehaviour
    {
        [SerializeField] private Transform target;
        [SerializeField] private float chaseRange = 8f;

        private void Update()
        {
            if (target == null)
            {
                return;
            }

            var distance = Vector3.Distance(transform.position, target.position);
            if (distance <= chaseRange)
            {
                Debug.DrawLine(transform.position, target.position, Color.red);
            }
        }
    }
}
