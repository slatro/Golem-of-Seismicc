using UnityEngine;

namespace SeismicGolem.UI
{
    public sealed class DebugCombatPanel : MonoBehaviour
    {
        public void SpawnTunnelBrute()
        {
            Debug.Log("Spawn Tunnel Brute clicked.");
        }

        public void GrantMagmaUpgrade()
        {
            Debug.Log("Grant Magma upgrade clicked.");
        }
    }
}
