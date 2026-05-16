using SeismicGolem.Combat;
using UnityEngine;

namespace SeismicGolem.Enemies
{
    public sealed class EnemyRoot : MonoBehaviour, IDamageable
    {
        [SerializeField] private float maxHealth = 30f;

        private float currentHealth;

        private void Awake()
        {
            currentHealth = maxHealth;
        }

        public void ReceiveDamage(DamageContext context)
        {
            currentHealth -= context.Amount;
            Debug.Log($"{name} took {context.Amount} damage. Remaining HP: {currentHealth}");
        }
    }
}
