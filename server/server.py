#!/usr/bin/env python3
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from app import app

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)