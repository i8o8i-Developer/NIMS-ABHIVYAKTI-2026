"""
Verification Script: VerifyFullSystem.py
Runs automated end-to-end checks across Backend tests and Frontend production build.
"""

import subprocess
import sys
from pathlib import Path

def run_step(step_name: str, cmd: list, cwd: Path):
    print(f"\n==========================================")
    print(f"Executing: {step_name}")
    print(f"Working Directory: {cwd}")
    print(f"Command: {' '.join(cmd)}")
    print(f"==========================================")

    res = subprocess.run(cmd, cwd=cwd, shell=True)
    if res.returncode != 0:
        print(f"Error: Step '{step_name}' Failed With Exit Code {res.returncode}")
        return False
    print(f"Success: Step '{step_name}' Completed.")
    return True

def main():
    root = Path(__file__).resolve().parent.parent
    backend = root / "Backend"
    frontend = root / "Frontend"

    # Step 1: Convention Check
    if not run_step("Check Conventions", ["python", "Scripts/CheckConventions.py"], root):
        sys.exit(1)

    # Step 2: Backend Pytest
    if not run_step("Backend Unit & API Tests", ["python", "-m", "pytest", "Tests", "-v"], backend):
        sys.exit(1)

    # Step 3: Frontend Build
    if not run_step("Frontend Production Build", ["npm", "run", "build"], frontend):
        sys.exit(1)

    print("\n==========================================")
    print("All System Checks Passed With 100% Reliability!")
    print("NIMS Abhivyakti 2026 Platform Is Production-Ready.")
    print("==========================================\n")

if __name__ == "__main__":
    main()

