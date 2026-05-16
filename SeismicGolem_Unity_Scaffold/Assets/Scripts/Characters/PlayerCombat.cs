using UnityEngine;

namespace SeismicGolem.Characters
{
    public sealed class PlayerCombat : MonoBehaviour
    {
        [SerializeField] private float lightDamage = 10f;
        [SerializeField] private float heavyDamage = 24f;

        public void PerformLightAttack()
        {
            Debug.Log($"Light attack fired for {lightDamage} damage.");
        }

        public void PerformHeavyAttack()
        {
            Debug.Log($"Heavy attack fired for {heavyDamage} damage.");
        }

        public void TriggerCorePulse()
        {
            Debug.Log("Core Pulse triggered.");
        }

        public void TriggerOverload()
        {
            Debug.Log("Overload State triggered.");
        }
    }
}
