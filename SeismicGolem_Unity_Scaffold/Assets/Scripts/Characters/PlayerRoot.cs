using UnityEngine;

namespace SeismicGolem.Characters
{
    public sealed class PlayerRoot : MonoBehaviour
    {
        [SerializeField] private PlayerMotor motor;
        [SerializeField] private PlayerCombat combat;
        [SerializeField] private PlayerStats stats;
        [SerializeField] private PlayerBuildState buildState;

        public PlayerMotor Motor => motor;
        public PlayerCombat Combat => combat;
        public PlayerStats Stats => stats;
        public PlayerBuildState BuildState => buildState;
    }
}
