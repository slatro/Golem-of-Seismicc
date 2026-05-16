using UnityEngine;

namespace SeismicGolem.Combat
{
    public struct DamageContext
    {
        public float Amount;
        public Vector3 Origin;
        public Vector3 Force;
        public bool AppliesBurn;
        public bool AppliesShock;
    }
}
