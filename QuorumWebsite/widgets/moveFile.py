import subprocess
import os
import sys

# Define source and destination directories relative to the script's location
script_dir = os.path.dirname(os.path.realpath(__file__))
source_dir = os.path.join(script_dir, 'Global', 'build', 'widget-js')
destination_dir = os.path.join(script_dir, '..', 'html', 'script', 'widgets')

# Construct the rsync command
rsync_command = ["rsync", "-av", "--delete", source_dir, destination_dir]

def sync_server_csp():
    try:
        result = subprocess.run(rsync_command, capture_output=True, text=True)
        if result.stderr:
            print(f"Error: {result.stderr}", file=sys.stderr)
        else:
            print(result.stdout)
    except Exception as e:
        print(f"An error occurred: {e}", file=sys.stderr)

if __name__ == "__main__":
    sync_server_csp()

