using UnityEngine;

namespace SeismicGolem.Characters
{
    public sealed class PlayerStats : MonoBehaviour
    {
        [SerializeField] private float maxHealth = 100f;
        [SerializeField] private float defense = 0f;

        public float MaxHealth => maxHealth;
        public float Defense => defense;
    }
}
