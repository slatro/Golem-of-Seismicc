using UnityEngine;

namespace SeismicGolem.Core
{
    public sealed class GameFlowController : MonoBehaviour
    {
        public void StartPrototypeRun()
        {
            Debug.Log("Starting prototype run flow.");
        }

        public void ReturnToHub()
        {
            Debug.Log("Returning to hub.");
        }
    }
}
